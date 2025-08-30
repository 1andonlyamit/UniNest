import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import DepartmentForm from "../../components/forms/DepartmentForm";
import { 
  getDepartmentsApi, 
  getSubDepartmentsApi, 
  getClassesApi,
  updateDepartmentApi,
  updateSubDepartmentApi,
  updateClassApi,
  deleteDepartmentApi,
  deleteSubDepartmentApi,
  deleteClassApi
} from "../../api/departments";

export default function Department() {
  const [activeForm, setActiveForm] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState(null);

  // Fetch departments, sub-departments, and classes on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [deptResponse, subDeptResponse, classResponse] = await Promise.all([
        getDepartmentsApi(),
        getSubDepartmentsApi(),
        getClassesApi()
      ]);
      
      setDepartments(deptResponse.data || []);
      setSubDepartments(subDeptResponse.data || []);
      setClasses(classResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    console.log("Form submitted:", data);
    
    // Refresh the data after successful submission
    await fetchData();
    
    // You can add success notification here if needed
    console.log(`${data.type} created successfully:`, data.data);
  };

  const handleEdit = (type, item) => {
    let editData = null;
    
    if (type === "Department") {
      editData = {
        type: "Department",
        id: item.id,
        departmentName: item.name,
        coordinatorName: item.department_coordinator_name
      };
    } else if (type === "SubDepartment") {
      const parentDept = departments.find(dept => dept.id === item.department_id);
      editData = {
        type: "SubDepartment",
        id: item.id,
        selectedDepartment: parentDept?.name || "",
        subDepartmentName: item.name
      };
    } else if (type === "Class") {
      const parentSubDept = subDepartments.find(subDept => subDept.id === item.sub_department_id);
      editData = {
        type: "Class",
        id: item.id,
        selectedSubDepartment: parentSubDept?.name || "",
        className: item.name,
        batchYear: item.batch_year?.toString() || "",
        section: item.section || ""
      };
    }
    
    setEditData(editData);
    setActiveForm(type);
  };

  const handleDelete = async (type, item) => {
    if (!window.confirm(`Are you sure you want to delete this ${type.toLowerCase()}?`)) {
      return;
    }

    try {
      if (type === "Department") {
        await deleteDepartmentApi(item.id);
      } else if (type === "SubDepartment") {
        await deleteSubDepartmentApi(item.id);
      } else if (type === "Class") {
        await deleteClassApi(item.id);
      }
      
      // Refresh data after successful deletion
      await fetchData();
      console.log(`${type} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}: ${error.message}`);
    }
  };

  const handleUpdate = async (data) => {
    try {
      if (data.type === "Department") {
        await updateDepartmentApi(editData.id, {
          name: data.departmentName,
          department_coordinator_name: data.coordinatorName
        });
      } else if (data.type === "SubDepartment") {
        const parentDept = departments.find(dept => dept.name === data.selectedDepartment);
        await updateSubDepartmentApi(editData.id, {
          department_id: parentDept.id,
          name: data.subDepartmentName
        });
      } else if (data.type === "Class") {
        const parentSubDept = subDepartments.find(subDept => subDept.name === data.selectedSubDepartment);
        await updateClassApi(editData.id, {
          sub_department_id: parentSubDept.id,
          name: data.className,
          batch_year: parseInt(data.batchYear),
          section: data.section || null
        });
      }
      
      // Refresh data after successful update
      await fetchData();
      setEditData(null);
      setActiveForm(null);
      console.log(`${data.type} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${data.type}:`, error);
      alert(`Failed to update ${data.type}: ${error.message}`);
    }
  };

  const handleCloseForm = () => {
    setActiveForm(null);
    setEditData(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-h1 font-bold mb-6 text-primary">Departments</h1>

      {/* Department List */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Departments</h2>
        {departments.length === 0 ? (
          <p className="text-gray-500">No departments found.</p>
        ) : (
          departments.map((dept) => (
            <div key={dept.id} className="flex justify-between items-center bg-secondary/10 p-3 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">{dept.name}</span>
                {dept.department_coordinator_name && (
                  <p className="text-sm text-gray-600">Coordinator: {dept.department_coordinator_name}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Pencil 
                  className="text-primary cursor-pointer" 
                  onClick={() => handleEdit("Department", dept)} 
                />
                <Trash2 
                  className="text-accent cursor-pointer" 
                  onClick={() => handleDelete("Department", dept)} 
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sub-Department List */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sub-Departments</h2>
        {subDepartments.length === 0 ? (
          <p className="text-gray-500">No sub-departments found.</p>
        ) : (
          subDepartments.map((subDept) => (
            <div key={subDept.id} className="flex justify-between items-center bg-secondary/10 p-3 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">{subDept.name}</span>
                <p className="text-sm text-gray-600">Department ID: {subDept.department_id}</p>
              </div>
              <div className="flex gap-3">
                <Pencil 
                  className="text-primary cursor-pointer" 
                  onClick={() => handleEdit("SubDepartment", subDept)} 
                />
                <Trash2 
                  className="text-accent cursor-pointer" 
                  onClick={() => handleDelete("SubDepartment", subDept)} 
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Class List */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Classes</h2>
        {classes.length === 0 ? (
          <p className="text-gray-500">No classes found.</p>
        ) : (
          classes.map((classItem) => (
            <div key={classItem.id} className="flex justify-between items-center bg-secondary/10 p-3 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">{classItem.name}</span>
                <p className="text-sm text-gray-600">
                  Batch Year: {classItem.batch_year} | Section: {classItem.section || 'N/A'} | Sub-Dept ID: {classItem.sub_department_id}
                </p>
              </div>
              <div className="flex gap-3">
                <Pencil 
                  className="text-primary cursor-pointer" 
                  onClick={() => handleEdit("Class", classItem)} 
                />
                <Trash2 
                  className="text-accent cursor-pointer" 
                  onClick={() => handleDelete("Class", classItem)} 
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveForm("Department")}
          className="flex items-center gap-2 bg-accent px-4 py-2 rounded-lg shadow-md text-white font-medium hover:bg-primary"
        >
          <Plus size={18} /> Add Department
        </button>
        <button
          onClick={() => setActiveForm("SubDepartment")}
          className="flex items-center gap-2 bg-accent px-4 py-2 rounded-lg shadow-md text-white font-medium hover:bg-primary"
        >
          <Plus size={18} /> Add Sub-Department
        </button>
        <button
          onClick={() => setActiveForm("Class")}
          className="flex items-center gap-2 bg-accent px-4 py-2 rounded-lg shadow-md text-white font-medium hover:bg-primary"
        >
          <Plus size={18} /> Add Class
        </button>
      </div>

      {activeForm && (
        <DepartmentForm
          onClose={handleCloseForm}
          onSubmit={editData ? handleUpdate : handleSubmit}
          departments={departments}
          subDepartments={subDepartments}
          classes={classes}
          isEdit={!!editData}
          editData={editData}
        />
      )}
    </div>
  );
}
