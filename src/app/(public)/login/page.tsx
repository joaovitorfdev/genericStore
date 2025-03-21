"use client";

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("login");
  }
  return (
    <div className="grid my-10 justify-center">
      <section className="border border-gray-200 rounded-lg min-w-96 p-6 shadow-md bg-white">
        <div className="text-center py-3.5">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        </div>
        <form
          className="grid py-3.5 justify-center text-center gap-y-6"
          onSubmit={handleSubmit}
        >
          <input
            className="w-80 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-80 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
            type="password"
            placeholder="Password"
          />
          <input
            className="w-80 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200"
            type="submit"
            value="Login"
          />
        </form>
      </section>
    </div>
  );
}
