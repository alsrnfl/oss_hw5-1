import TopBar from "./topbar/TopBar";
import Form from "./form/Form";
import Modal from "./modal/Modal";

function ShowList() {
    return (
    <div className="container mt-5">
        <TopBar />
        <Form />
        <Modal />
    </div>
    );
}

export default ShowList;