import React from "react";
import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import { Alert } from "../components/common/Alert/Alert";
import { DismissableAlert } from "../components/common/Alert/DismissableAlert";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
const DismissableTemplate: ComponentStory<typeof DismissableAlert> = (args) => (
  <DismissableAlert {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  message: "Alert",
  onClose: undefined,
};

export const Info = Template.bind({});
Info.args = {
  type: "info",
  message: "Alert",
  onClose: undefined,
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
  message: "Alert",
  onClose: undefined,
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  message: "Alert",
  onClose: undefined,
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  message: "Alert",
  onClose: undefined,
};

export const Dismissable = DismissableTemplate.bind({});
Dismissable.args = {
  type: "warning",
  message: "Alert",
};
