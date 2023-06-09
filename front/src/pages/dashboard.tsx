import ContactsList from "@/components/contactsList";
import Dash from "@/components/dash";
import Header from "@/components/header";
import ModalClient from "@/components/modalClient";
import ModalUpdateContact from "@/components/modalUpdateContact";
import { useAuth } from "@/context/authContext";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    isContainsContacts,
    showModalUpdateContact,
    isContainsClient,
    onGetAllContacts,
  } = useAuth();

  useEffect(() => {
    onGetAllContacts("");
  }, []);

  return (
    <>
      <Header isLogged />
      <Dash />
      {isContainsContacts && <ContactsList />}
      {showModalUpdateContact && <ModalUpdateContact />}
      {isContainsClient && <ModalClient />}
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
    props: { token: cookies["kenzie.token"] },
  };
};

export default Dashboard;
