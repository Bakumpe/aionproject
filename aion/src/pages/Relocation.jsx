import React, { useState } from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import { Button, Group, Textarea, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import Whatsapp from "../components/Whatsapp";

function Relocation() {
  const [formTitle, setFormTitle] = useState("Moving Details");
  const [movingType, setMovingType] = useState("");
  const [pet, setPet] = useState("");
  const [petName, setPetName] = useState("");

  const form = useForm({
    initialValues: {
      locationFrom: "",
      locationTo: "",
      pet: "",
      yesNo: "",
    },
  });

  const handleSubmit = () => {
    form.clear();
  };

  const handleMovingTypeClick = (type) => {
    setFormTitle(type);
    setMovingType(type);
  };

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Relocate With Ease</p>
          </div>
          <div className="move">
            <div className="moveSmarter">
              <div className="moveSmarter-1">
                <p>Move with AionMov</p>
                <div className="contactUs">Contact Us</div>
              </div>
            </div>
            <div className="moving">
              <div className="moving1">
                <div
                  className="moving2"
                  onClick={() => handleMovingTypeClick("National Moving")}
                >
                  National Moving
                </div>
                <div
                  className="moving2"
                  onClick={() => handleMovingTypeClick("Home Moving")}
                >
                  Home Moving
                </div>
                <div
                  className="moving2"
                  onClick={() => handleMovingTypeClick("Office Moving")}
                >
                  Office Moving
                </div>
                <div
                  className="moving2"
                  onClick={() => handleMovingTypeClick("Storage Moving")}
                >
                  Storage Moving
                </div>
                <div
                  className="moving2"
                  onClick={() => handleMovingTypeClick("Other")}
                >
                  Other
                </div>
              </div>
            </div>
            <div className="movingDetails">
              <div className="heading">{formTitle}</div>
              <form onSubmit={handleSubmit}>
                <TextInput
                  type="text"
                  label="Where are you moving from?"
                  placeholder="Location From"
                  className="textRelocation"
                  {...form.getInputProps("locationFrom")}
                />

                <TextInput
                  type="text"
                  label="Where are you moving to?"
                  placeholder="Location To"
                  className="textRelocation"
                  {...form.getInputProps("locationTo")}
                />

                {movingType === "National Moving" && (
                  <>
                    <TextInput
                      type="text"
                      label="Country of Origin"
                      placeholder="Country of Origin"
                      className="textRelocation"
                      {...form.getInputProps("countryOfOrigin")}
                    />
                    <TextInput
                      type="text"
                      label="Destination Country"
                      placeholder="Destination Country"
                      className="textRelocation"
                      {...form.getInputProps("destinationCountry")}
                    />
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="List your Items"
                      className="textarea"
                      {...form.getInputProps("itemsDescription")}
                    />
                  </>
                )}

                {movingType === "Home Moving" && (
                  <>
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="List your Items"
                      className="textarea"
                      {...form.getInputProps("itemsDescription")}
                    />
                    <TextInput
                      type="number"
                      label="Number of rooms"
                      placeholder="Number of rooms"
                      className="textRelocation"
                      {...form.getInputProps("numberOfRooms")}
                    />
                  </>
                )}

                {movingType === "Office Moving" && (
                  <>
                    <TextInput
                      type="text"
                      label="Current Office Address"
                      placeholder="Current Office Address"
                      className="textRelocation"
                      {...form.getInputProps("currentOfficeAddress")}
                    />
                    <TextInput
                      type="text"
                      label="New Office Address"
                      placeholder="New Office Address"
                      className="textRelocation"
                      {...form.getInputProps("newOfficeAddress")}
                    />
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="List your Items"
                      className="textarea"
                      {...form.getInputProps("itemsDescription")}
                    />
                  </>
                )}

                {movingType === "Storage Moving" && (
                  <>
                    <TextInput
                      type="text"
                      label="Storage Location"
                      placeholder="Storage Location"
                      className="textRelocation"
                      {...form.getInputProps("storageLocation")}
                    />
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="List your Items"
                      className="textarea"
                      {...form.getInputProps("storageItemsDescription")}
                    />
                  </>
                )}

                {movingType === "Other" && (
                  <>
                    <Textarea
                      label="Additional details"
                      placeholder="List your Items"
                      className="textarea"
                      {...form.getInputProps("additionalDetails")}
                    />
                  </>
                )}

                <div className="selection">
                  <label htmlFor="pet-select">Do you have a pet?</label>
                  <select
                    id="pet-select"
                    className="custom-select"
                    value={pet}
                    onChange={(e) => setPet(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {pet === "yes" && (
                  <TextInput
                    type="text"
                    label="Pet's Name"
                    placeholder="Enter your pet's name"
                    value={petName}
                    className="textRelocation"
                    onChange={(e) => setPetName(e.target.value)}
                  />
                )}
              </form>
              <Button type="submit" className="relocationButton">Submit</Button>
            </div>
          </div>
        </div>
        {/* <div className="sideBar">
          <Footer />
        </div> */}
      </div>

      <Whatsapp />
    </>
  );
}

export default Relocation;
