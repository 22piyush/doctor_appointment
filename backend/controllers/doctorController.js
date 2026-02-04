import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async (req, res) => {
    try {
        const { docId, available } = req.body;

        if (!docId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        const doctor = await doctorModel.findByIdAndUpdate(
            docId,
            { available: Boolean(available) },
            { new: true } // returns updated document
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            doctor,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

}

export { changeAvailablity };