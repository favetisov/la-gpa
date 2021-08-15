import { createStore } from '@stencil/store';
import { User } from '@src/models/user.model';

const store = createStore(new User());

export const userState = store.state;
export const onUserStateChange = store.onChange;
