const { pool } = require("../config/db");

// Get All Guests
const getGuests = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM marriage_db.guests where record_type_status NOT IN ('Inactive','inactive')");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guests", error });
  }
};

// Get All Guests
const getGuestByID = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM marriage_db.guests where id=$1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guests", error });
  }
};

// Add a New Guest
const addGuest = async (req, res) => {
  const { name, amount, phone, created_by, updated_by, record_type_status, address } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO marriage_db.guests 
            (name, amount, phone, created_date, created_by, updated_date, updated_by, record_type_status, address) 
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP, $5, $6, $7) 
            RETURNING *`,
      [name, amount, phone, created_by, updated_by, record_type_status, address]
    );
    res.status(201).json({message:"Guest inserted successfully",guest: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding guest", error: error.message });
  }
};

// Update an existing Guest
const updateGuest = async (req, res) => {
  const { id } = req.query;
  const { name, amount, phone, updated_by, record_type_status, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE marriage_db.guests 
       SET name = $1, 
           amount = $2, 
           phone = $3, 
           updated_date = CURRENT_TIMESTAMP, 
           updated_by = $4, 
           record_type_status = $5,
           address=$6
       WHERE id = $7
       RETURNING *`,
      [name, amount, phone, updated_by, record_type_status, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Guest not found" });
    }
    
    res.json({ message: "Guest Updated successfully", guest: result.rows[0] });
    // res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating guest", error: error.message });
  }
};

const deleteGuest = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await pool.query(
      `UPDATE marriage_db.guests 
       SET record_type_status = 'Inactive', updated_date = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.json({ message: "Guest deleted successfully", guest: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting guest", error: error.message });
  }
};


module.exports = { getGuests, getGuestByID, addGuest, updateGuest,deleteGuest };
