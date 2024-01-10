interface SessionPageProps {
    params: {
      sessionId: string;
    };
  }


const sessionPage = async({ params }: SessionPageProps) => {

    {/* check if premium */}
    const {sessionId} = params;


  return (
    <div className="flex justify-center items-center h-screen">
        This is session {sessionId}
    </div>
  );
};

export default sessionPage;
