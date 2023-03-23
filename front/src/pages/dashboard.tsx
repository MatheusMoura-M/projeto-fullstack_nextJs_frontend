import Header from "@/components/header";
import { GetServerSideProps } from "next";
import nookies from "nookies";

const Dashboard = () => {
  return (
    <>
      <Header isLogged />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies["kenzie.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { name: cookies["kenzie.token"] },
  };
};

export default Dashboard;
