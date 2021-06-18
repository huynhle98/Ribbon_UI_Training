// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
// import { ButtonComponent } from '../app/components/button/button.component';
export default {
  title: 'Library/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule]
    })
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
  type: 'lb-btn--primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  type: 'lb-btn--secondary'
};

export const Success = Template.bind({});
Success.args = {
  label: 'Button',
  type: 'lb-btn--success'
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Button',
  type: 'lb-btn--warning'
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Button',
  type: 'lb-btn--error'
};



export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
