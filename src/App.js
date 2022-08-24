import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Row,
  Col,
  Card,
  ButtonGroup,
} from "reactstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions";

export default function App(args) {
  const mystate = useSelector((val) => val.TODO);
  const dispatch = useDispatch();
  const [tasks, settasks] = useState({ title: "", items: [""] });
  const [updateTasks, setUpdateTasks] = useState({
    title: "",
    items: [""],
  });
  const [updateindex, setupdateindex] = useState(0);

  const Add = () => {
    const clone = JSON.parse(JSON.stringify(tasks));
    clone.items.push("");
    settasks(clone);
  };

  const sub = (index) => {
    const clone = JSON.parse(JSON.stringify(tasks));
    clone.items.splice(index, 1);
    console.log(clone);
    settasks(clone);
  };

  const handleOnChangeTitle = (event) => {
    const clone = JSON.parse(JSON.stringify(tasks));
    clone.title = event.target.value;
    settasks(clone);
  };

  const handleOnChangeTask = (event, index) => {
    const clone = JSON.parse(JSON.stringify(tasks));
    clone.items[index] = event.target.value;
    settasks(clone);
  };

  const updateOnChangeHeading = (event) => {
    const clone = JSON.parse(JSON.stringify(updateTasks));
    clone.title = event.target.value;
    setUpdateTasks(clone);
  };

  const updateOnChangeTask = (event, index) => {
    const clone = JSON.parse(JSON.stringify(updateTasks));
    clone.items[index] = event.target.value;
    setUpdateTasks(clone);
  };

  const update = (index, value) => {
    setupdateindex(index);
    setUpdateTasks(value);
    toggle();
  };
  const updateAdd = () => {
    const clone = JSON.parse(JSON.stringify(updateTasks));
    clone.items.push("");
    setUpdateTasks(clone);
  };

  const updatesub = (index) => {
    const clone = JSON.parse(JSON.stringify(updateTasks));
    clone.items.splice(index, 1);
    setUpdateTasks(clone);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const done = (e) => {
    e.preventDefault();
    dispatch(
      actions.Submitted(tasks),
      settasks({
        title: "",
        items: [""],
      })
    );
  };

  const updateDone = (e) => {
    e.preventDefault();
    toggle();
    dispatch(actions.Updated(updateTasks, updateindex));
    console.log("done");
  };
  return (
    <>
      <div className="container mt-3">
        <Row>
          <Col sm="6">
            <Card body>
              <h4>Task title</h4>
              <Form onSubmit={done}>
                <Row>
                  <Col md={12}>
                    <Input
                      onChange={(event) => handleOnChangeTitle(event)}
                      name="title"
                      placeholder="Enter Your title"
                      type="text"
                      value={tasks.title}
                      required
                    />
                  </Col>
                </Row>
                <h4 className="mt-3">Tasks list</h4>
                {tasks.items.map((value, index) => (
                  <Row key={index}>
                    <Col md={9}>
                      <Input
                        className="my-4"
                        onChange={(event) => handleOnChangeTask(event, index)}
                        name="items"
                        placeholder="Enter Your Task"
                        type="text"
                        value={value}
                        required
                      />
                    </Col>
                    <br />
                    <Col md={2}>
                      <ButtonGroup size="lg">
                        <Button
                          color="warning"
                          outline
                          className="btn my-3"
                          onClick={() => Add()}
                        >
                          +
                        </Button>
                        {index !== 0 && (
                          <Button
                            color="danger"
                            outline
                            className=" btn my-3"
                            onClick={() => sub(index)}
                          >
                            -
                          </Button>
                        )}
                      </ButtonGroup>
                    </Col>
                  </Row>
                ))}
                <Button type="submit" className="btn btn-info">
                  submit
                </Button>
              </Form>
            </Card>
          </Col>
          <Col sm="6">
            <Card body color="secondary">
              {mystate.list.map((value1, index1) => (
                <div
                  style={{ color: "white" }}
                  className=" p-2 my-4"
                  key={index1}
                >
                  <h4>{value1.title}</h4>
                  <ul>
                    {value1.items.map((val, ind) => (
                      <div key={ind}>
                        <li>{val}</li>
                      </div>
                    ))}
                    <ButtonGroup>
                      <Button
                        outline
                        color="warning"
                        onClick={() => update(index1, value1)}
                        className="btn mt-3"
                      >
                        Update{" "}
                      </Button>
                      <Button
                        outline
                        color="danger"
                        className="btn ms-2  mt-3"
                        onClick={() => dispatch(actions.Deleted(index1))}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </ul>
                  <div></div>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Update</ModalHeader>
          <ModalBody>
            <h4>Title</h4>
            <Form>
              <input
                onChange={(event) => updateOnChangeHeading(event)}
                defaultValue={updateTasks.title}
                name="data"
                placeholder="Enter Your Heading"
                type="text"
                required
              />

              <h4>Sub Tasks</h4>

              {updateTasks.items.map((value, place) => (
                <div key={place}>
                  <input
                    onChange={(event) => updateOnChangeTask(event, place)}
                    className="mt-3"
                    name="task"
                    defaultValue={value}
                    type="text"
                    required
                  />

                  <Button
                    outline
                    color="warning"
                    className="btn ms-2"
                    onClick={() => updateAdd()}
                  >
                    +
                  </Button>

                  {place !== 0 && (
                    <Button
                      outline
                      color="danger"
                      className=" btn ms-2"
                      onClick={() => updatesub(place)}
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              <Button
                outline
                color="success"
                className="btn btn-warning mt-2"
                onClick={updateDone}
              >
                update
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    </>
  );
}
