import vaccine from "../assests/images/vaccine-icon.png"
import selfcare from "../assests/images/selfcare.png"
import laboratory from"../assests/images/laboratory.png"
import treatment from"../assests/images/treatment.png"
import pethealth from "../assests/images/pethealth.png"
import symptoms from "../assests/images/symptoms.png"
import checkup from "../assests/images/checkup.png"

const services = [
  {
    image: vaccine,
    name: "Vaccine",
    link: "/vaccine",
    body: "Protect yourself with our full vaccination programs."
  },
  {
    image: treatment,
    name: "Clinic",
    link: "/clinic",
    body: "Walk-in or scheduled specialist consultation services."
  },
  {
    image: selfcare,
    name: "Self Care",
    link: "/selfcare",
    body: "Personal health tips and remote self-care support."
  },
  {
    image: laboratory,
    name: "Laboratory",
    link: "/laboratory",
    body: "Advanced diagnostic testing and pathology labs."
  },
  {
    image: treatment,
    name: "Treatment",
    link: "/treatment",
    body: "Specialized and surgical treatment services."
  },
  {
    image: pethealth,
    name: "Pet Health",
    link: "/pethealth",
    body: "Veterinary care and diagnostics for your pets."
  },
  {
    image: symptoms,
    name: "Symptoms",
    link: "/symptoms",
    body: "Use our checker to identify and track symptoms."
  },
  {
    image: checkup,
    name: "Checkup",
    link: "/checkup",
    body: "Full-body routine health checkups and screenings."
  },
];

export default services;
