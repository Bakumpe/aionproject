import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/relocation.css";
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
                  onClick={() => handleMovingTypeClick("House Moving")}
                >
                  Domestic Moving
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
                  {...form.getInputProps("locationFrom")}
                />

                <TextInput
                  type="text"
                  label="Where are you moving to?"
                  placeholder="Location To"
                  {...form.getInputProps("locationTo")}
                />

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
                    onChange={(e) => setPetName(e.target.value)}
                  />
                )}

                {movingType === "International Moving" && (
                  <>
                    <TextInput
                      type="text"
                      label="Country of Origin"
                      placeholder="Country of Origin"
                      {...form.getInputProps("countryOfOrigin")}
                    />
                    <TextInput
                      type="text"
                      label="Destination Country"
                      placeholder="Destination Country"
                      {...form.getInputProps("destinationCountry")}
                    />
                  </>
                )}

                {movingType === "House Moving" && (
                  <>
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="Items description"
                      {...form.getInputProps("itemsDescription")}
                    />
                    <TextInput
                      type="number"
                      label="Number of rooms"
                      placeholder="Number of rooms"
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
                      {...form.getInputProps("currentOfficeAddress")}
                    />
                    <TextInput
                      type="text"
                      label="New Office Address"
                      placeholder="New Office Address"
                      {...form.getInputProps("newOfficeAddress")}
                    />
                  </>
                )}

                {movingType === "Storage Moving" && (
                  <>
                    <TextInput
                      type="text"
                      label="Storage Location"
                      placeholder="Storage Location"
                      {...form.getInputProps("storageLocation")}
                    />
                    <Textarea
                      label="Describe the items to be moved"
                      placeholder="Items description"
                      {...form.getInputProps("storageItemsDescription")}
                    />
                  </>
                )}

                {movingType === "Other" && (
                  <>
                    <Textarea
                      label="Additional details"
                      placeholder="Provide additional details"
                      {...form.getInputProps("additionalDetails")}
                    />
                  </>
                )}

                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Relocation;
