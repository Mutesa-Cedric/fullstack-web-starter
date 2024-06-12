import { Button, Fieldset, Input, Tabs } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { generatePageTitle } from "../../lib/utils";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"personalInfo" | "security">("personalInfo");

  const handlePersonalInfoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };
    console.log(data);
  }

  const handleSecurityFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    console.log(data);
  }

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Your Profile")}</title>
      </Helmet>
      <main className="space-y-5">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value as "personalInfo" | "security")}>
          <Tabs.List>
            <Tabs.Tab value="personalInfo">Personal Information</Tabs.Tab>
            <Tabs.Tab value="security">Security</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personalInfo">
            <Fieldset legend="Personal Information" className="mt-4">
              <form
                onSubmit={handlePersonalInfoFormSubmit}
                className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" >Name</label>
                    <Input id="name" name="name" placeholder="Name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" name="email" placeholder="Email" />
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <Button variant="outline">
                    Reset
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Fieldset>
          </Tabs.Panel>
          <Tabs.Panel value="security">
            <Fieldset legend="Security" className="mt-4">
              <form
                onSubmit={handleSecurityFormSubmit}
                className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="currentPassword">Current Password</label>
                  <Input id="currentPassword" type="password" name="currentPassword" placeholder="Current Password" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="newPassword">New Password</label>
                  <Input id="newPassword" type="password" name="newPassword" placeholder="New Password" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" />
                </div>
                <div className="flex gap-x-5 col-span-full mt-4">
                  <Button variant="outline">
                    Reset
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Fieldset>
          </Tabs.Panel>
        </Tabs>
      </main>
    </>
  )
}
