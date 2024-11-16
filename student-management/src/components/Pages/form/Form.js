import { useState } from "react";
import Modal from "../modal/Modal";

export default function Form() {

    const [id, setId] = useState("");
    const [students, setStudents] = useState([]);
    const [name, setName] = useState(""); // 빈 문자열로 초기화 
    const [age, setAge] = useState(""); // 빈 문자열로 초기화 
    const [major, setMajor] = useState(""); // 빈 문자열로 초기화 
    const [modal, setModal] = useState(false);  // 모달 열림 여부
    const [modalMessage, setModalMessage] = useState("");

    function getDataFromJSONFile() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://672818b6270bd0b97554501f.mockapi.io/api/v1/student"); // 엔드포인트 URL
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                let students = JSON.parse(xhr.response);
                setStudents(students);
            }
        };
    }

    function showAlert(message) {
        setModalMessage(message); 
        setModal(true);  // 모달 열기
    }

    function hideModal() {
        setModal(false);  // 모달 닫기
    }

    // 데이터 추가 (POST)
    function createDataToJSONFile() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://672818b6270bd0b97554501f.mockapi.io/api/v1/student"); // 엔드포인트 URL
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

        let data = {
            name: name,
            age: age,
            major: major
        };

        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            if (xhr.status === 201) {
                showAlert("등록 성공!");
                getDataFromJSONFile(); // 데이터 가져오는 함수 호출
            }
        };
    }

    // 데이터 수정 (PUT)
    function updateDataToJSONFile() {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://672818b6270bd0b97554501f.mockapi.io/api/v1/student/${id}`); // 엔드포인트 URL
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");

        let data = {
            name: name,
            age: age,
            major: major
        };

        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            if (xhr.status === 200) {
                showAlert("수정 성공!");
                getDataFromJSONFile();
            }
        };
    }


    // // 데이터 삭제 (DELETE)
    function deleteDataFromJSONFile() {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://672818b6270bd0b97554501f.mockapi.io/api/v1/student/${id}`); // 엔드포인트 URL
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                showAlert("삭제 성공!");
                getDataFromJSONFile();
            } else {
                alert("삭제 실패!");
            }
        };
    }

    return (
        <div class="card p-4 mb-4">
            <div class="row g-3">
                <div class="col-md-3">
                    <input
                        type="text"
                        id="student_id"
                        className="form-control"
                        placeholder="ID"
                        aria-label="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div class="col-md-3">
                    <input
                        type="text"
                        id="student_name"
                        className="form-control"
                        placeholder="Name"
                        aria-label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div class="col-md-3">
                    <input
                        type="number"
                        id="student_age"
                        className="form-control"
                        placeholder="Age"
                        aria-label="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div class="col-md-3">
                    <input
                        type="text"
                        id="student_major"
                        className="form-control"
                        placeholder="Major"
                        aria-label="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
            </div>
            <div class="text-center mt-3">
                <button onClick={getDataFromJSONFile} className="btn btn-primary me-2">Get Data</button>
                <button onClick={createDataToJSONFile} className="btn btn-success me-2">Create Data</button>
                <button onClick={updateDataToJSONFile} className="btn btn-warning me-2">Update Data</button>
                <button onClick={deleteDataFromJSONFile} className="btn btn-danger">Delete Data</button>
            </div>

            <div id="div_students" className="row row-cols-1 row-cols-md-3 g-4">
                {students.map((student) => (
                    <div key={student.id}>
                        <h3>ID: {student.id}</h3>
                        <p>NAME: {student.name}</p>
                        <p>AGE: {student.age}</p>
                        <p>MAJOR: {student.major}</p>
                        <hr />
                    </div>
                ))}
            </div>

            <Modal isOpen={modal} message={modalMessage} onClose={hideModal} />
            
        </div>
    );
}
