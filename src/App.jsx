import React, { useEffect, useState } from "react";
import "./App.css";
import {
    addDoc,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc, // Import deleteDoc
} from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState([]);
    const [personalInformation, setPersonalInformation] = useState([]);

    // State to manage updates
    const [updateInfo, setUpdateInfo] = useState({
        id: null,
        name: "",
        age: "",
    });

    const userCollectionRef = collection(db, "users");
    const personalInfoCollectionRef = collection(db, "personalInformation");

    const createUserInfo = async () => {
        await addDoc(userCollectionRef, {
            Name: newName,
            Age: Number(newAge),
        });
    };

    const updateUserInfo = async (id, updatedName, updatedAge) => {
        const userDoc = doc(db, "users", id);
        const newFields = { Name: updatedName, Age: Number(updatedAge) };
        await updateDoc(userDoc, newFields);
        setUpdateInfo({ id: null, name: "", age: "" }); // Clear the update form after updating
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);

    useEffect(() => {
        const getPersonalInfo = async () => {
            const personalData = await getDocs(personalInfoCollectionRef);
            setPersonalInformation(
                personalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getPersonalInfo();
    }, []);

    return (
        <div className="space-y-8">
            <div>Hello World</div>

            <div>
                <input
                    className=" border border-red-500 rounded-md p-4 m-3"
                    type="text"
                    placeholder="Enter your name"
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    className="border border-red-500 rounded-md  p-4 m-3"
                    type="number"
                    placeholder="Enter your age"
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />
                <button
                    onClick={createUserInfo}
                    className="m-4 p-3 rounded-md hover:bg-red-700  bg-orange-400 text-white"
                >
                    Create user
                </button>
            </div>

            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h1>Name: {user.Name}</h1>
                        <h1>Age: {user.Age}</h1>
                        <button
                            className=" p-3 rounded-md hover:bg-red-700 bg-orange-400 text-white"
                            onClick={() =>
                                setUpdateInfo({
                                    id: user.id,
                                    name: user.Name,
                                    age: user.Age,
                                })
                            }
                        >
                            Edit
                        </button>
                        <button
                            className="m-4 p-3 rounded-md hover:bg-red-700  bg-orange-400 text-white"
                            onClick={() => deleteUser(user.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}

            {updateInfo.id && (
                <div>
                    <input
                        type="text"
                        value={updateInfo.name}
                        onChange={(e) =>
                            setUpdateInfo((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <input
                        type="number"
                        value={updateInfo.age}
                        onChange={(e) =>
                            setUpdateInfo((prev) => ({
                                ...prev,
                                age: e.target.value,
                            }))
                        }
                    />
                    <button
                        className="m-4 p-3 rounded-md hover:bg-red-700  bg-orange-400 text-white"
                        onClick={() =>
                            updateUserInfo(
                                updateInfo.id,
                                updateInfo.name,
                                updateInfo.age
                            )
                        }
                    >
                        Update User
                    </button>
                </div>
            )}

            {personalInformation.map((personalInfo) => (
                <div key={personalInfo.id}>
                    <h1>Home: {personalInfo.Home}</h1>
                    <h1>District: {personalInfo.District}</h1>
                    <h1>Upozilla: {personalInfo.Upozilla}</h1>
                </div>
            ))}
        </div>
    );
}

export default App;
