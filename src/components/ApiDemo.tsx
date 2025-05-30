import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DataItem {
  id: number;
  name: string;
  description: string;
}

// Function to determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // In development, the proxy will forward requests to the local server
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  // In production, use the deployed Render backend URL
  // Replace this with your actual Render URL once deployed
  return 'https://your-render-app-name.onrender.com';
};

const ApiDemo: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data from API. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedItem = await response.json();
      setData([...data, addedItem]);
      setNewItem({ name: '', description: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Is the server running?');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  return (
    <Container>
      <Title>API Demo</Title>
      
      <Section>
        <SectionTitle>Add New Item</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextArea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Enter item description"
              rows={3}
            />
          </FormGroup>
          
          <Button type="submit">Add Item</Button>
        </Form>
      </Section>
      
      <Section>
        <SectionTitle>Items from API</SectionTitle>
        {loading && <Message>Loading data...</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!loading && !error && data.length === 0 && (
          <Message>No items found</Message>
        )}
        
        <ItemList>
          {data.map((item) => (
            <ItemCard key={item.id}>
              <ItemName>{item.name}</ItemName>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemCard>
          ))}
        </ItemList>
      </Section>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Section = styled.section`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ItemCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemName = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Message = styled.p`
  color: #666;
  text-align: center;
  margin: 20px 0;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
`;

export default ApiDemo; 