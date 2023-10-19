export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl text-slate-200">UserProfile</h1>
      <hr />
      <p className="text-lg">Profile Page 
        <span className="ml-2 px-4 py-2 bg-orange-600 rounded-lg text-black">{params.id}</span>
      </p>
    </div>
  );
}
