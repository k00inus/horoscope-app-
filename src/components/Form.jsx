
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../index.css'

const Form = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    starSign: "",
  });
  const [nameError, setNameError] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    starSign: false,
    style: { backgroundColor: "white" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    const style = name + "style";
    const zodiacRegex = /[^select$]/;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  
    if (value === "") {
      setNameError((prevData) => ({
        ...prevData,
        [name]: false,
        [style]: { backgroundColor: "pink" },
      }));
    } else {
      setNameError((prevData) => ({
        ...prevData,
        [name]: true,
        [style]: { backgroundColor: "lightgreen" },
      }));
    }
    if (zodiacRegex.test(data[name])) {
        setNameError((prevData) => ({
          ...prevData,
          [name]: true,
          [style]: { backgroundColor: "pink" },
        }));
      } else {
        setNameError((prevData) => ({
          ...prevData,
          [name]: false,
          [style]: { backgroundColor: "lightgreen" },
        }));
      }
  };

  const handleKeyUp = (e) => {
    const nameRegex = /[a-zA-Z]{2,}/;
    const name = e.target.name;
    const style = name + "style";

    if (nameRegex.test(data[name])) {
      setNameError((prevData) => ({
        ...prevData,
        [name]: false,
        [style]: { backgroundColor: "lightgreen" },
      }));
    } else {
      setNameError((prevData) => ({
        ...prevData,
        [name]: true,
        [style]: { backgroundColor: "pink" },
      }));
    }
  };

  const canSave = [...Object.values(data)].every(Boolean);
  let navigate = useNavigate();
  function handleClick() {
    navigate('/horoscope', { state: { data: data } });
    
  }

  return (
    <section className="form-section">
      <form
        id="form"
        method="get"
        action="./horoscope.html"
        onSubmit={handleSubmit}
      >
        <label className="form-label" htmlFor="firstname">
          First name:
        </label>
        <input
          className="form-input"
          type="text"
          name="firstName"
          id="firstname"
          placeholder="John"
          value={data.firstName}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          style={nameError.firstNamestyle}
        />
        {nameError.firstName ? (
          <em style={{ color: "red" }}>
            your first name must at least 2 letters and no numbers or special
            characters
          </em>
        ) : null}
        <label className="form-label" htmlFor="lastname">
          Last name:
        </label>
        <input
          className="form-input"
          type="text"
          name="lastName"
          id="lastname"
          placeholder="Smith"
          value={data.lastName}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          style={nameError.lastNamestyle}
        />
        {nameError.lastName ? (
          <em style={{ color: "red" }}>
            your last name must at least 2 letters and no numbers or special
            characters
          </em>
        ) : null}
        <label className="form-label" htmlFor="birth-date">
          Date of Birth:
        </label>
        <input
          className="form-input"
          type="date"
          name="birthDate"
          id="birth-date"
          value={data.birthDate}
          onChange={handleChange}
          style={nameError.birthDatestyle}
        />
        {nameError.birthDate ? (
          <em style={{ color: "red" }}>select your birth date</em>
        ) : null}

        <label className="form-label" htmlFor="star-sign">
          Zodiac Sign:
        </label>
        <select
          name="starSign"
          id="star-sign"
          value={data.starSign}
          onChange={handleChange}
          style={nameError.starSignstyle}
        >
          <option value="select">Choose Your Zodiac Sign</option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
        {nameError.starSign ? (
          <em style={{ color: "red" }}>select your zodiac sign</em>
        ) : null}
        <button id="submit-btn" disabled={!canSave} onClick={handleClick}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Form;
