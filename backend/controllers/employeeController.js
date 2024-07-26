const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const { image, name, email, mobile, designation, gender, course } = req.body;

  try {
    let employee = new Employee({
      image,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateEmployee = async (req, res) => {
  const { image, name, email, mobile, designation, gender, course } = req.body;

  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    employee.image = image || employee.image;
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    await employee.remove();
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
