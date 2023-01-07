import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export const CustomTable = ({ trans }) => {
  const [itemToDelete, setItemToDelete] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    checked
      ? setItemToDelete([...itemToDelete, value])
      : setItemToDelete([itemToDelete.filter((item) => item != value)]);
  };
  const handleOnAllSelect = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setItemToDelete(trans?.map(({ _id }) => _id));
      setIsAllSelected(true);
    } else {
      setItemToDelete([itemToDelete.filter((item) => item !== value)]);
      setIsAllSelected(false);
    }
  };
  const handleOnDelete = () => {};

  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>
            <th>
              <InputGroup
                className="mb-3"
                onChange={handleOnAllSelect}
                checked={isAllSelected}
              >
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </th>
          </th>
          <th>Name</th>
          <th>Income</th>
          <th>Expenses</th>
        </tr>
      </thead>
      <tbody>
        {trans.map((item, i) => (
          <tr key={i} className="fw-bolder">
            <td>
              <th>
                <InputGroup>
                  <InputGroup.Checkbox
                    className="mb-3"
                    onChange={handleOnSelect}
                    checked={itemToDelete.includes(item._id)}
                    aria-label="Checkbox for following text input"
                  />
                </InputGroup>
              </th>
            </td>
            <td>{item.name}</td>
            {item.type === "income" ? (
              <>
                {" "}
                <td className="text-success">{item.amount}</td> <td></td>
              </>
            ) : (
              <>
                <td></td> <td className="text-danger">-{item.amount}</td>{" "}
              </>
            )}
          </tr>
        ))}

        <tr className="fw-bolder">
          <td colSpan={3}>Total Balance</td>
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
  );
};
