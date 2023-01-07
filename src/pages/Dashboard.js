import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { CustomTable } from "../components/customTable/CustomTable";
import { Tform } from "../components/Folder/Tform";
import { MainLayout } from "../components/mainLayout/MainLayout";
import { fetchTransactions } from "../helpers/axiosHelpers";

const Dashboard = () => {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    fetchingTrans();
  }, []);

  const fetchingTrans = async () => {
    const { status, result } = await fetchTransactions();

    status === "success" && setTrans(result);
  };

  console.log(trans);
  return (
    <MainLayout>
      <Container>
        <Tform fetchingTrans={fetchingTrans} />
        {/* form section   */}

        {/* table section */}
        <div className="ttable">
          <CustomTable trans={trans} />
        </div>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
