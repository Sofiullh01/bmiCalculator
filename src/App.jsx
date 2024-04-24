import { useState } from "react";

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState(null);
  const [healthCondition, setHealthCondition] = useState('');

  const calculateBMI = () => {
    if (!height || !weight || !age) {
      alert('Please enter height, weight, and age.');
      return;
    }

    const heightMeters = height / 100;
    const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(2);
    setBMI(bmiValue);

    const idealWeight = calculateIdealWeight(height, age);
    if (weight > idealWeight) {
      setHealthCondition('Overweight');
    } else if (weight < idealWeight) {
      setHealthCondition('Underweight');
    } else {
      setHealthCondition('Normal weight');
    }
  };

  const calculateIdealWeight = (height, age) => {
    // Simple formula for ideal weight based on height and age
    // You can adjust this formula as per your requirement
    return (height - 100 + (age / 10)) * 0.9;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      <div className="flex flex-col items-center">
        <input
          type="number"
          className="w-48 border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
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
            <li>Normal weight: 18.5–24.9</li>
            <li>Overweight: 25–29.9</li>
            <li>Obesity: 30 or more</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
