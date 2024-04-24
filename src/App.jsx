import { useState } from "react";

function App() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState(null);
  const [healthCondition, setHealthCondition] = useState('');

  const calculateBMI = () => {
    if (!feet || !inches || !weight || !age) {
      alert('Please enter height (feet and inches), weight, and age.');
      return;
    }

    const heightInInches = feet * 12 + parseInt(inches);
    const heightInMeters = heightInInches * 0.0254; // Convert to meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    const idealWeight = calculateIdealWeight(heightInInches, age);

    if (bmiValue < 18.5 && weight < idealWeight) {
      setHealthCondition('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setHealthCondition('Good health');
    } else if (bmiValue >= 25 && weight > idealWeight) {
      setHealthCondition('Overweight');
    } else {
      setHealthCondition('Average health');
    }
  };

  const calculateIdealWeight = (heightInInches, age) => {
    // Simple formula for ideal weight based on height and age
    // You can adjust this formula as per your requirement
    return (heightInInches - 60 + (age / 10) * 2.3);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      <div className="flex flex-col items-center">
        <div className="flex">
          <input
            type="number"
            className="w-20 border border-gray-300 rounded-md p-2 mb-2 mr-2"
            placeholder="Feet"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
          />
          <input
            type="number"
            className="w-20 border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Inches"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
          />
        </div>
        <input
          type="number"
          className="w-48 border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          className="w-48 border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Age (years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>
      </div>
      {bmi && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Your BMI: {bmi}</h2>
          <h2 className="text-xl font-bold mb-2">Health Condition: {healthCondition}</h2>
          <p className="text-gray-700">BMI Categories:</p>
          <ul className="list-disc pl-8">
            <li>Underweight: less than 18.5</li>
            <li>Good health: 18.5–24.9</li>
            <li>Overweight: 25 or more</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
