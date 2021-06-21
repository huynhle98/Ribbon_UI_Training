import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { Items } from '../../data/items';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'Library/Cart',
  component: CartComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule]
    })
  ],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CartComponent> = (args: CartComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  items: Items
};

export const Empty = Template.bind({});
Empty.args = {
  items: []
};
