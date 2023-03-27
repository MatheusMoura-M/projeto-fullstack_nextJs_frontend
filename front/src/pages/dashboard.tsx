import ContactsList from "@/components/contactsList";
import Header from "@/components/header";
import ModalClient from "@/components/modalClient";
import ModalUpdateContact from "@/components/modalUpdateContact";
import { useAuth } from "@/context/authContext";
import { GetServerSideProps } from "next";
import nookies from "nookies";

const Dashboard = () => {
  const { isContainsContacts, showModalUpdateContact, isContainsClient } =
    useAuth();
  return (
    <>
      <Header isLogged />
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
