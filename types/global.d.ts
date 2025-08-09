declare global {

  // eslint-disable-next-line no-vars
  var mongoose: {
    conn: import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  }
}

export { }