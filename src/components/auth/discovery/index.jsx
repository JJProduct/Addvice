import React, { useState, useEffect } from 'react';
import { database } from "../../../firebase/firebase"; // Ensure the correct path
import { collection, onSnapshot } from "firebase/firestore"; // Import necessary Firestore functions
import './Discovery.css'; // Ensure correct import path

const Discovery = () => {
  const [people, setPeople] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'users'), snapshot => {
      const peopleData = snapshot.docs.map(doc => doc.data());
      setPeople(peopleData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Discovery</h1>
      <div>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Features
        </button>
        {isDropdownOpen && (
          <div>
            <a href="/discovery">Discover</a>
            <a href="/message">Message</a>
            <a href="/currentMentorMentees">Current Mentors/Mentees</a>
            <a href="/profile">Profile</a>
          </div>
        )}
      </div>

      <div className="profiles-container">
        {people.map(person => (
          <div key={person.name} className="profile-box">
            <img 
              src={person.profilePicture} 
              alt={`${person.name}'s profile`} 
              className="profile-picture"
            />
            <h3>{person.name}</h3>
            <p>Age: {person.age}</p>
            <p>Occupation: {person.occupation}</p>
            <p>Industry: {person.industry}</p>
            <p>Role: {person.role}</p>
            <p>Gender: {person.gender}</p>
            <p>Interests: {person.interests}</p>
            <p>About Me: {person.AboutMe}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Discovery;
