declare module 'bcryptjs' {
    export function hash(
      data: string,
      saltOrRounds: string | number
    ): Promise<string>;
  
    export function compare(
      data: string,
      encrypted: string
    ): Promise<boolean>;
  
    // You can add more method declarations as needed
  }
  