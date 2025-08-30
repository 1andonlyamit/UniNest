import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Bell, 
  Shield, 
  CreditCard,
  Users,
  Building,
  Globe,
  Eye,
  EyeOff,
  Check,
  Crown,
  Star
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    placement: true,
    applications: true
  });

  const [profileData, setProfileData] = useState({
    universityName: "Maharaja Sayajirao University of Baroda",
    email: "admin@sut.edu",
    phone: "+91 9898938564",
    address: "kalabhavan road, vadodara, Gujarat",
    website: "msu.in",
    establishedYear: "1965",
    studentsCount: "15000",
    description: "Leading institution in technology and engineering education"
  });

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "Rs.499",
      period: "month",
      current: false,
      features: ["Up to 500 students", "10 company partnerships", "Basic analytics", "Email support"]
    },
    {
      name: "Professional",
      price: "Rs.999",
      period: "month", 
      current: true,
      features: ["Up to 2000 students", "50 company partnerships", "Advanced analytics", "Priority support", "Custom branding"]
    },
    {
      name: "Enterprise",
      price: "Rs.1999",
      period: "month",
      current: false,
      features: ["Unlimited students", "Unlimited partnerships", "Premium analytics", "24/7 support", "API access", "White-label solution"]
    }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id 
          ? 'bg-primary text-white shadow-md' 
          : 'text-muted hover:bg-secondary/20 hover:text-primary'
      }`}
    >
      <Icon size={20} />
      <span className="font-warm font-medium">{label}</span>
    </button>
  );

  const InputField = ({ label, value, onChange, type = "text", icon: Icon, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 font-warm">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm`}
        />
      </div>
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
      <div>
        <h4 className="font-medium text-gray-800 font-warm">{label}</h4>
        <p className="text-sm text-muted font-warm">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const PlanCard = ({ plan }) => (
    <div className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
      plan.current 
        ? 'border-primary bg-primary/5 shadow-lg' 
        : 'border-gray-200 hover:border-primary/50'
    }`}>
      {plan.current && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium font-warm flex items-center gap-1">
            <Crown size={14} />
            Current Plan
          </span>
        </div>
      )}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 font-warm">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-primary">{plan.price}</span>
          <span className="text-muted">/{plan.period}</span>
        </div>
      </div>
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600 font-warm">
            <Check size={16} className="text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors font-warm ${
        plan.current
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
          : 'bg-primary text-white hover:bg-primary/90'
      }`}>
        {plan.current ? 'Current Plan' : 'Upgrade'}
      </button>
    </div>
  );

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-gray-800 font-warm">University Settings</h1>
          <p className="text-muted font-warm">Manage your university profile and portal preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
              <nav className="space-y-2">
                <TabButton id="profile" label="Profile" icon={User} />
                <TabButton id="subscription" label="Subscription" icon={CreditCard} />
                <TabButton id="notifications" label="Notifications" icon={Bell} />
                <TabButton id="security" label="Security" icon={Shield} />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-soft p-8">
                <div className="mb-6">
                  <h2 className="text-h2 font-bold text-gray-800 font-warm">University Profile</h2>
                  <p className="text-muted font-warm">Update your university information and settings</p>
                </div>

                {/* Profile Photo */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-warm">University Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Building className="text-primary" size={32} />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-warm">
                      <Camera size={18} />
                      Change Logo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <InputField
                    label="University Name"
                    value={profileData.universityName}
                    onChange={(value) => handleInputChange('universityName', value)}
                    icon={Building}
                  />
                  <InputField
                    label="Official Email"
                    value={profileData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    type="email"
                    icon={Mail}
                  />
                  <InputField
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    icon={Phone}
                  />
                  <InputField
                    label="Website"
                    value={profileData.website}
                    onChange={(value) => handleInputChange('website', value)}
                    icon={Globe}
                  />
                  <InputField
                    label="Established Year"
                    value={profileData.establishedYear}
                    onChange={(value) => handleInputChange('establishedYear', value)}
                  />
                  <InputField
                    label="Total Students"
                    value={profileData.studentsCount}
                    onChange={(value) => handleInputChange('studentsCount', value)}
                    icon={Users}
                  />
                </div>

                <div className="mb-8">
                  <InputField
                    label="Address"
                    value={profileData.address}
                    onChange={(value) => handleInputChange('address', value)}
                    icon={MapPin}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-warm">University Description</label>
                  <textarea
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm"
                    placeholder="Brief description of your university..."
                  />
                </div>

                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-warm font-medium">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "subscription" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-soft p-8">
                  <h2 className="text-h2 font-bold text-gray-800 font-warm mb-2">Current Subscription</h2>
                  <p className="text-muted font-warm mb-6">Manage your subscription plan and billing</p>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary font-warm">Professional Plan</h3>
                        <p className="text-muted font-warm">Next billing date: March 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">Rs.999</div>
                        <div className="text-muted text-sm font-warm">per month</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-white border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-warm">
                        Manage Billing
                      </button>
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-warm">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-8">
                  <h3 className="text-h3 font-bold text-gray-800 font-warm mb-6">Available Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subscriptionPlans.map((plan, index) => (
                      <PlanCard key={index} plan={plan} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-soft p-8">
                <h2 className="text-h2 font-bold text-gray-800 font-warm mb-2">Notification Preferences</h2>
                <p className="text-muted font-warm mb-6">Choose how you want to be notified about important updates</p>

                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    label="Email Notifications"
                    description="Receive updates via email"
                  />
                  <ToggleSwitch
                    enabled={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                    label="SMS Notifications"
                    description="Receive important alerts via SMS"
                  />
                  <ToggleSwitch
                    enabled={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    label="Push Notifications"
                    description="Browser and mobile push notifications"
                  />
                  <ToggleSwitch
                    enabled={notifications.placement}
                    onChange={() => handleNotificationChange('placement')}
                    label="Placement Updates"
                    description="Notifications about new placement opportunities"
                  />
                  <ToggleSwitch
                    enabled={notifications.applications}
                    onChange={() => handleNotificationChange('applications')}
                    label="Application Status"
                    description="Updates on student application status"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-warm font-medium">
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-soft p-8">
                <h2 className="text-h2 font-bold text-gray-800 font-warm mb-2">Security Settings</h2>
                <p className="text-muted font-warm mb-6">Manage your account security and password</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 font-warm mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
                          className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm"
                        />
                      </div>
                      <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-warm font-medium">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 font-warm mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 font-warm">Enable 2FA</h4>
                        <p className="text-sm text-muted font-warm">Add an extra layer of security to your account</p>
                      </div>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-warm font-medium">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 font-warm mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800 font-warm">Current Session</h4>
                          <p className="text-sm text-muted font-warm">Chrome on Windows • Active now</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium font-warm">Current</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800 font-warm">Mobile Session</h4>
                          <p className="text-sm text-muted font-warm">Safari on iPhone • 2 hours ago</p>
                        </div>
                        <button className="text-red-600 text-sm font-medium font-warm hover:text-red-700">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;