"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// Helper function to initialize Supabase client
async function initSupabase() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function fetchFilteredUsers(username: string) {
  const supabase = await initSupabase();

  const { data, error } = await supabase
    .from("profile")
    .select("username")
    .ilike("username", `%${username}%`);

  return data;
}

export async function getPosts(username: { username: string }) {
  const supabase = await initSupabase();

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", username);

  if (userError || !userData || userData.length === 0) {
    return;
  }

  const user_id = userData[0].id;

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user_id);

  return postData;
}

export async function pushFollow(username: { username: string }) {
  const supabase = await initSupabase();

  // Get follower id
  const {
    data: { user: currentUserData },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) {
    return;
  }

  // Get followee id

  const { data: followeeData, error: followeeDataError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", username);

  if (followeeDataError) {
    return;
  }

  // Push follow record to db
  const { error } = await supabase.from("followers").insert([
    {
      follower_id: currentUserData?.id,
      followee_id: followeeData[0]?.id,
    },
  ]);

  if (error) {
    return;
  }

  return;
}

export async function pushUnfollow(username: { username: string }) {
  const supabase = await initSupabase();

  // Get follower id
  const {
    data: { user: currentUserData },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) {
    return;
  }

  // Get followee id

  const { data: followeeData, error: followeeDataError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", username);

  if (followeeDataError) {
    return;
  }

  // Push follow record to db
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", currentUserData?.id)
    .eq("followee_id", followeeData[0]?.id);

  if (error) {
    return;
  }

  return;
}

export async function checkFollow(username: {username: string}) {
  const supabase = await initSupabase();

  // Get follower id
  const {
    data: { user: currentUserData },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) {
    return;
  }

  // Get followee id

  const { data: followeeData, error: followeeDataError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", username);

  if (followeeDataError) {
    return;
  }

  // Check if following
  const { data: followingData, error: followingDataError } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", currentUserData?.id)
    .eq("followee_id", followeeData[0]?.id);

  if (followingDataError) {
    return;
  }

  return followingData.length > 0;
}