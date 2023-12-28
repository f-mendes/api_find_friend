export class MissingRequiredFields extends Error {
  constructor() {
    super('Missing required fields')
  }
}
