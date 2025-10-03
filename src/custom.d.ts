
declare module "*.css";
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module "*.json";
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.svg' {
  const content: string;
  export default content;
}
