import mitt from 'mitt';

type Events = {
  'task:refresh': boolean;
};

const emitter = mitt<Events>();

export default emitter;
