import React, { useState, useEffect } from "react";
import "./task.css";

const Task = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        const savedPeople = JSON.parse(localStorage.getItem("people"));
        if (savedPeople) {
            setPeople(savedPeople);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("people", JSON.stringify(people));
    }, [people]);

    const isNameValid = /^[A-Za-z]+$/.test(name);

    const handleAddClick = () => {
        if (name && age) {
            if (selectedPerson === null) {
                setPeople([...people, { name, age }]);
            } else {
                const updatedPeople = [...people];
                updatedPeople[selectedPerson] = { name, age };
                setPeople(updatedPeople);
                setSelectedPerson(null);
            }
            setName("");
            setAge("");
        }
    };

    const handleEditClick = (index) => {
        const personToEdit = people[index];
        setName(personToEdit.name);
        setAge(personToEdit.age);
        setSelectedPerson(index);
    };

    const handleRemoveClick = (index) => {
        const updatedPeople = [...people];
        updatedPeople.splice(index, 1);
        setPeople(updatedPeople);
    };

    return (
        <div className="container">
            <div className="app">
                <div className="field">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            const inputValue = e.target.value;

                            if (/^[A-Za-z]+$/.test(inputValue) || inputValue === "") {
                                setName(inputValue);
                            }
                        }}
                        style={{ borderColor: isNameValid ? "" : "red" }}
                    />
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <button onClick={handleAddClick} disabled={!isNameValid}>
                        {selectedPerson !== null ? "UPDATE" : "ADD"}
                    </button>
                </div>
                <div className="people-list">
                    <h2>People:</h2>
                    <ul>
                        {people.map((person, index) => (
                            <li className="list" key={index}>
                                Name: {person.name}, Age: {person.age}
                                <button onClick={() => handleEditClick(index)}>Edit</button>
                                <button onClick={() => handleRemoveClick(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Task;
