
interface ServerStatusProps {
  serverStatus: string;
}

const ServerStatus = ({ serverStatus }: ServerStatusProps) => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-white">Server Status</h3>
      <div className="bg-slate-700 p-4 rounded-lg">
        <div className="flex items-center justify-center space-x-2">
          {serverStatus === "checking" ? (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-mono">CHECKING...</span>
            </>
          ) : serverStatus === "online" ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-mono">ONLINE</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-400 font-mono">OFFLINE</span>
            </>
          )}
        </div>
        <p className="text-slate-400 text-sm mt-2">
          Client Ready For Gaming
        </p>
      </div>
    </div>
  );
};

export default ServerStatus;
