import React, { useState } from "react";
import { X } from "lucide-react";
import { createDepartmentApi, createSubDepartmentApi, createClassApi } from "../../api/departments";

export default function DepartmentForm({ onClose, onSubmit, departments = [], subDepartments = [], classes = [], isEdit = false, editData = null }) {
  const [activeTab, setActiveTab] = useState(editData ? editData.type : "Department");
  const [formData, setFormData] = useState({
    departmentName: editData?.departmentName || "",
    coordinatorName: editData?.coordinatorName || "",
    subDepartmentName: editData?.subDepartmentName || "",
    selectedDepartment: editData?.selectedDepartment || "",
    selectedSubDepartment: editData?.selectedSubDepartment || "",
    className: editData?.className || "",
    batchYear: editData?.batchYear || "",
    section: editData?.section || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (activeTab === "Department") {
        if (!formData.departmentName || !formData.coordinatorName) {
          throw new Error("Please fill in all department fields");
        }

        // For now, hardcoding university_id as 1 - you might want to get this from context/props
        const departmentData = {
          university_id: 1,
          name: formData.departmentName,
          department_coordinator_name: formData.coordinatorName
        };

        const response = await createDepartmentApi(departmentData);
        console.log("Department created:", response);
        
        // Call onSubmit with the created department data
        onSubmit({ 
          type: activeTab, 
          data: response,
          departmentName: formData.departmentName,
          coordinatorName: formData.coordinatorName
        });

      } else if (activeTab === "SubDepartment") {
        if (!formData.selectedDepartment || !formData.subDepartmentName) {
          throw new Error("Please fill in all sub-department fields");
        }

        // Find the department ID from the selected department name
        const selectedDept = departments.find(dept => dept.name === formData.selectedDepartment);
        if (!selectedDept) {
          throw new Error("Selected department not found");
        }

        const subDepartmentData = {
          department_id: selectedDept.id,
          name: formData.subDepartmentName
        };

        const response = await createSubDepartmentApi(subDepartmentData);
        console.log("Sub-department created:", response);
        
        // Call onSubmit with the created sub-department data
        onSubmit({ 
          type: activeTab, 
          data: response,
          departmentName: formData.selectedDepartment,
          subDepartmentName: formData.subDepartmentName
        });
      } else if (activeTab === "Class") {
        if (!formData.selectedSubDepartment || !formData.className || !formData.batchYear) {
          throw new Error("Please fill in all class fields");
        }

        // Find the sub-department ID from the selected sub-department name
        const selectedSubDept = subDepartments.find(subDept => subDept.name === formData.selectedSubDepartment);
        if (!selectedSubDept) {
          throw new Error("Selected sub-department not found");
        }

        const classData = {
          sub_department_id: selectedSubDept.id,
          name: formData.className,
          batch_year: parseInt(formData.batchYear),
          section: formData.section || null
        };

        const response = await createClassApi(classData);
        console.log("Class created:", response);
        
        // Call onSubmit with the created class data
        onSubmit({ 
          type: activeTab, 
          data: response,
          subDepartmentName: formData.selectedSubDepartment,
          className: formData.className,
          batchYear: formData.batchYear,
          section: formData.section
        });
      }

      onClose();
    } catch (error) {
      console.error("Error creating entry:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    // Reset form data when switching tabs
    setFormData({
      departmentName: "",
      coordinatorName: "",
      subDepartmentName: "",
      selectedDepartment: "",
      selectedSubDepartment: "",
      className: "",
      batchYear: "",
      section: "",
    });
  };

  const tabs = ["Department", "SubDepartment", "Class"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? `Edit ${activeTab}` : "Add New Entry"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2 px-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {activeTab === "Department" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter department name"
                  value={formData.departmentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coordinator Name
                </label>
                <input
                  type="text"
                  name="coordinatorName"
                  placeholder="Enter coordinator name"
                  value={formData.coordinatorName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {activeTab === "SubDepartment" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Department Name
                </label>
                <input
                  type="text"
                  name="subDepartmentName"
                  placeholder="Enter sub department name"
                  value={formData.subDepartmentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {activeTab === "Class" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Department
                </label>
                <select
                  name="selectedSubDepartment"
                  value={formData.selectedSubDepartment}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Sub Department</option>
                  {subDepartments.map((subDept) => (
                    <option key={subDept.id} value={subDept.name}>{subDept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  name="className"
                  placeholder="Enter class name"
                  value={formData.className}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Year
                </label>
                <input
                  type="number"
                  name="batchYear"
                  placeholder="Enter batch year"
                  value={formData.batchYear}
                  onChange={handleChange}
                  required
                  min="2000"
                  max="2030"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  placeholder="Enter section (e.g., A, B, C)"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : `${isEdit ? 'Update' : 'Save'} ${activeTab}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
