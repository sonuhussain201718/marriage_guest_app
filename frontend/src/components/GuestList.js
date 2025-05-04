import React, { useEffect, useState } from "react";
import { Container, Card, Table, Spinner, Button, InputGroup, FormControl } from 'react-bootstrap';
import { PencilSquare, Trash, Funnel, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import ModalPopup from './ModalPopup';  // Import the Modal component

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [modalContent, setModalContent] = useState({ title: '', body: '', onConfirm: () => {} });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/guests/get_all_guests");
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    setModalContent({
      title: 'Update Guest',
      body: `Are you sure you want to update guest with ID: ${id}?`,
      onConfirm: () => {
        // You can navigate to update page or handle update here
        setShowModal(false);  // Close the modal
        alert(`Updating guest with ID: ${id}`);  // Just for demonstration
      }
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setModalContent({
      title: 'Delete Guest',
      body: `Are you sure you want to delete guest with ID: ${id}?`,
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/guests/delete_guest?id=${id}`, {
            method: 'PUT'
          });
          if (response.ok) {
            fetchGuests();
            setShowModal(false);  // Close the modal
          }
        } catch (error) {
          console.error("Error deleting guest:", error);
        }
      }
    });
    setShowModal(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedGuests = [...guests].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = String(a[sortConfig.key] || '').toLowerCase();
    const bValue = String(b[sortConfig.key] || '').toLowerCase();

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredGuests = sortedGuests.filter((guest) =>
    Object.values(guest).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowUp /> : <ArrowDown />;
    }
    return <ArrowUp className="text-muted" />;
  };

  return (
    <Container fluid className="mt-5">

      <Card className="shadow-lg p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h3 className="text-primary mb-0">Guest List</h3>
          <InputGroup style={{ maxWidth: "300px" }}>
            <FormControl
              placeholder="Search all columns"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <Funnel />
            </Button>
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="text-center text-muted p-3">No guests found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive className="w-100">
              <thead className="table-primary" style={{ position: "sticky", top: 0 }}>
                <tr>
                  <th>#</th>
                  <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                    Name {renderSortIcon('name')}
                  </th>
                  <th onClick={() => handleSort('phone')} style={{ cursor: 'pointer' }}>
                    Phone {renderSortIcon('phone')}
                  </th>
                  <th onClick={() => handleSort('address')} style={{ cursor: 'pointer' }}>
                    Address {renderSortIcon('address')}
                  </th>
                  <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                    Amount Paid {renderSortIcon('amount')}
                  </th>
                  <th onClick={() => handleSort('record_type_status')} style={{ cursor: 'pointer' }}>
                    Status {renderSortIcon('record_type_status')}
                  </th>
                  <th onClick={() => handleSort('created_date')} style={{ cursor: 'pointer' }}>
                    Registered Date {renderSortIcon('created_date')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr
                    key={guest.id}
                    style={{
                      backgroundColor:
                        guest.record_type_status.toLowerCase() === 'active' ? '#d4edda' : '#f8d7da'
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{guest.name}</td>
                    <td>{guest.phone}</td>
                    <td>{guest.address || '-'}</td>
                    <td>₹{guest.amount}</td>
                    <td>
                      <span className={`badge ${guest.record_type_status.toLowerCase() === 'active' ? 'bg-success' : 'bg-danger'}`}>
                        {guest.record_type_status}
                      </span>
                    </td>
                    <td>{new Date(guest.created_date).toLocaleDateString()}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdate(guest.id)}>
                        <PencilSquare />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(guest.id)}>
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      {/* Modal component */}
      <ModalPopup
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalContent.title}
        body={modalContent.body}
        onConfirm={modalContent.onConfirm}
      />
    </Container>
  );
};

export default GuestList;
