export const createController = (Model) => {
  return {
    getAll: async (req, res) => {
      try {
        const docs = await Model.find();
        res.status(200).json(docs);
      } catch (err) {
        console.error(`Error in ${Model.modelName} getAll:`, err);
        res.status(500).json({ error: "Server error" });
      }
    },

    getOne: async (req, res) => {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
          return res.status(404).json({ error: "Document not found" });
        }
        res.status(200).json(doc);
      } catch (err) {
        console.error(`Error in ${Model.modelName} getOne:`, err);
        res.status(500).json({ error: "Server error" });
      }
    },

    create: async (req, res) => {
      try {
        const newDoc = await Model.create(req.body);
        res.status(201).json(newDoc);
      } catch (err) {
        console.error(`Error in ${Model.modelName} create:`, err);
        if (err.name === 'ValidationError') {
           return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Server error" });
      }
    },

    update: async (req, res) => {
      try {
        const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true 
        });

        if (!updatedDoc) {
          return res.status(404).json({ error: "Document not found" });
        }
        res.status(200).json(updatedDoc);
      } catch (err) {
        console.error(`Error in ${Model.modelName} update:`, err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
         }
        res.status(500).json({ error: "Server error" });
      }
    },

    delete: async (req, res) => {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
          return res.status(404).json({ error: "Document not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: "Server error" });
      }
    }
  };
};