// api.test.js

import { test1 } from "../algo";



describe('/api/algo', () => {
  it('should return "hello world"', async () => {
    const response = test1();
    expect(response).toBe('hello world');
  });
});
