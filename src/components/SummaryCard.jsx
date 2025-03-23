// src/components/SummaryCard.jsx
const SummaryCard = ({ title, value }) => {
    return (
      <div style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        minWidth: '200px',
        textAlign: 'center'
      }}>
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>
    );
  };
  
  export default SummaryCard;