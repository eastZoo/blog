import React, { useState, useEffect } from "react";
import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOG_IN_REQUEST } from "../../redux/reducers/auth";

const LoginModal = () => {
  // 모달이 열려있는지 닫혀있는지
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  // 리덕스에서 정의한 함수 실행을 위해
  const dispatch = useDispatch();
  //reducer index.js에서 정의한 auth ( authReducer = auth로 재정의한 것)
  const { errorMsg } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  // 로그인버튼이나 백드롭을 클릭할때 에러메세지를 비워주는 함수
  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };

  // 로그인 폼에 입력한 밸류 저장
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch({
      type: LOG_IN_REQUEST,
      // 여기 payload로 넘겨주는 값이 sagas loginUser의 action.payload이다
      payload: user,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;