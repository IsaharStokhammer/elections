import mongoose from "mongoose";
import Candidate from "./models/CandidateModel";
import UserModel, { IUser } from "./models/UserModel";

interface ICandidate {
  name: string;
  image: string;
  votes: number;
}

const PORT = process.env.PORT;

async function createCandidates(): Promise<void> {
  try {
    await mongoose.connect(
      "mongodb+srv://8526656:1WThE3gaYOUDeLta@cluster0.87rl3.mongodb.net/elections?retryWrites=true&w=majority&appName=Cluster0"
    );

    // יצירת ארבע מתמודדים
    const candidates: ICandidate[] = [
      {
        name: "Donald Trump",
        image: "https://bit.ly/3On8bFr",
        votes: 0,
      },
      {
        name: "Kamala Harris",
        image: "https://bit.ly/48HCPCE",
        votes: 0,
      },
      {
        name: "Jill Stein",
        image: "https://bit.ly/3NZiKOJ",
        votes: 0,
      },
      {
        name: "Robert Kennedy",
        image: "https://bit.ly/4fENsbI",
        votes: 0,
      },
    ];
    const adminUser: any = {
      userName: "yisa",
      password: "1234",
      isAdmin: true,
      hasVoted: false,
      votedFor: null,
    };

    await Candidate.insertMany(candidates);
    await UserModel.create(adminUser);
    console.log("Candidates created successfully");
  } catch (error) {
    console.error("Error creating candidates:", error);
  } finally {
    mongoose.connection.close();
  }
}

export default createCandidates;
