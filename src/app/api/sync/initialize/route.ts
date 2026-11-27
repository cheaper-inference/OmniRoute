import { NextResponse } from "next/server";
import initializeCloudSync from "@/shared/services/initializeCloudSync";
import {
  isModelSyncSchedulerRunning,
  startModelSyncScheduler,
} from "@/shared/services/modelSyncScheduler";
import { getCloudSyncScheduler } from "@/shared/services/cloudSyncScheduler";

let syncInitialized = false;

// POST /api/sync/initialize - Initialize cloud sync scheduler
export async function POST(request) {
  try {
    if (syncInitialized) {
      return NextResponse.json({
        success: true,
        message: "Cloud sync already initialized",
        modelSyncEnabled: isModelSyncSchedulerRunning(),
      });
    }

    await initializeCloudSync();
    syncInitialized = true;

    // (#488) Start model auto-sync scheduler (6h default, configurable via MODEL_SYNC_INTERVAL_HOURS).
    // start is idempotent and reports the running state, so a process whose
    // boot path already armed the timers still answers correctly here.
    const modelSyncEnabled = startModelSyncScheduler();

    return NextResponse.json({
      success: true,
      message: "Cloud sync initialized successfully",
      modelSyncEnabled,
    });
  } catch (error) {
    console.log("Error initializing cloud sync:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize cloud sync",
      },
      { status: 500 }
    );
  }
}

// GET /api/sync/status - Check sync initialization status
export async function GET(request) {
  // Both halves report the scheduler that owns them, not a flag this module set.
  const cloud = await getCloudSyncScheduler();
  const cloudRunning = cloud.isRunning();
  return NextResponse.json({
    initialized: cloudRunning,
    modelSyncInitialized: isModelSyncSchedulerRunning(),
    message: cloudRunning ? "Cloud sync is running" : "Cloud sync not initialized",
  });
}
