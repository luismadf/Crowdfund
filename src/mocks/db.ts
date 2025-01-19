import { factory, primaryKey, nullable } from "@mswjs/data";
import { sample } from "lodash-es";

const project = {
  id: "1",
  title: "Mastercraft Bamboo Monitor Riser",
  subtitle:
    "A beautiful & handcrafted monitor stand to reduce neck and eye strain.",
  description:
    "The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.\n\nFeaturing artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.",
  goal: 100000,
  funded: 89914,
  backersCount: 5007,
  daysLeft: 56,
  isBookmarked: sample([true, false]),
};

const options = [
  {
    id: "1-1",
    projectId: "1",
    title: "Pledge with no reward",
    caption: null,
    minValue: 1,
    description:
      "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
    amountLeft: -1,
    noShowMainScreen: true,
  },
  {
    id: "1-2",
    projectId: "1",
    title: "Bamboo Stand",
    description:
      "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
    caption: "Pledge $25 or more",
    minValue: 25,
    amountLeft: 101,
    noShowMainScreen: false,
  },
  {
    id: "1-3",
    projectId: "1",
    title: "Black Edition Stand",
    description:
      "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    caption: "Pledge $75 or more",
    minValue: 75,
    amountLeft: 64,
    noShowMainScreen: false,
  },
  {
    id: "1-4",
    projectId: "1",
    title: "Mahogany Special Edition",
    description:
      "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
    caption: "Pledge $200 or more",
    minValue: 200,
    amountLeft: 0,
    noShowMainScreen: false,
  },
];

export const db = factory({
  project: {
    id: primaryKey(String),
    title: String,
    subtitle: String,
    description: String,
    goal: Number,
    funded: Number,
    backersCount: Number,
    daysLeft: Number,
    isBookmarked: Boolean,
  },
  option: {
    id: primaryKey(String),
    projectId: String,
    title: String,
    description: String,
    caption: nullable(String),
    minValue: Number,
    amountLeft: Number,
    noShowMainScreen: Boolean,
  },
});

db.project.create(project);

options.forEach((option) => db.option.create(option));
