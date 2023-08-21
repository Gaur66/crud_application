declare module 'uuid' {
    export function v1(options?: { node?: number[]; clockSeq?: number; msecs?: number; nsecs?: number }): string;
    export function v3(name: string | Buffer, namespace: string | Buffer): string;
    export function v4(options?: { random?: number[]; rng?: () => number[] }): string;
    export function v5(name: string | Buffer, namespace: string | Buffer): string;
    export function parse(uuid: string): Buffer;
    export function unparse(buffer: Buffer): string;
  }
  