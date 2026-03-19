import { useState } from "react";

function App() {
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [places, setPlaces] = useState([]);

  const getRecommendations = async () => {
    const response = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interest, budget }),
    });

    const data = await response.json();
    setPlaces(data.recommended_places);
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "15px",
      background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
      color: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
      fontWeight: "bold",
      textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
    },
    input: {
      width: "80%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      outline: "none",
    },
    button: {
      padding: "12px 25px",
      border: "none",
      borderRadius: "8px",
      background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    },
    list: {
      listStyleType: "none",
      padding: 0,
      marginTop: "25px",
    },
    listItem: {
      background: "#fff",
      color: "#333",
      padding: "15px 20px",
      margin: "10px 0",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    listItemHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Travel Recommendation System</h1>

      <input
        type="text"
        placeholder="Enter interest (beach/mountains/city)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter budget (low/medium/high)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={styles.input}
      />

      <br />
      <button
        onClick={getRecommendations}
        style={styles.button}
        onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
        onMouseOut={(e) =>
          (e.target.style.transform = e.target.style.boxShadow = "")
        }
      >
        Get Recommendations
      </button>

      <h2 style={{ ...styles.heading, fontSize: "1.5rem", marginTop: "30px" }}>
        Results:
      </h2>
      <ul style={styles.list}>
        {places.map((place, index) => (
          <li
            key={index}
            style={styles.listItem}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, styles.listItemHover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = e.currentTarget.style.boxShadow =
                "")
            }
          >
            {place}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;