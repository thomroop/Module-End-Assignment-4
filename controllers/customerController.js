const Customer = require("../models/Customer");


exports.addCustomer = async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;
        const customer = new Customer({ name, email, phone, status });
        await customer.save();
        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (error) {
        res.status(400).json({ message: "Error adding customer", error: error.message });
    }
};


exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};


exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error: error.message });
    }
};


exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, status },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        res.status(400).json({ message: "Error updating customer", error: error.message });
    }
};


exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error: error.message });
    }
};
