export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl text-slate-200">UserProfile</h1>
      <hr />
      <p className="text-4xl">Profile Page 
        <span>{params.id}</span>
      </p>
    </div>
  );
}
