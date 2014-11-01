gs.include("JSON");

var ngGlideRecord = Class.create();

ngGlideRecord.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    get : function(){
        var table = this.getParameter("table").toString();
        var sys_id = this.getParameter("sys_id").toString();
                
        return new JSON().encode( this._get(table, sys_id) );
    },

    _get : function(table, sys_id){
        var ngRecordFields = [],
            ngField = {};

        try{
            var ngRecord = new GlideRecord(table);
            ngRecord.get(sys_id);

            for (field in ngRecord) {

                if( field !== "sys_meta"){
                    var ngRecordED = ngRecord[field].getED();

                    ngField = {
                        name : ngRecordED.getName(),
                        value : ngRecord.canRead() ? ngRecord[field].toString() : "",
                        display_value : ngRecord.canRead() ? ngRecord[field].getDisplayValue() : "",
                        mandatory : ngRecordED.isMandatory(),
                        readonly : ngRecordED.isReadOnly(),
                        display : ngRecordED.isDisplay(),
                        type  : ngRecordED.getInternalType(),
                        length : ngRecordED.getLength(),
                        label : ngRecordED.getLabel(),
                        reference : ngRecordED.getReference(),
                        reference_qualifier : ngRecordED.getReferenceQualifier(),
                        choice : ngRecordED.getChoice(),
                        choices : ngRecord[field].getChoices().toString(),
                        default_value : ngRecordED.getDefault(),
                        hint : ngRecordED.getHint()
                    }

                    ngRecordFields.push(ngField);
                    
                }
            }
                    
            return ngRecordFields;
            

        } catch(e) {
            this._log(e)
        }

        return false
    },

    _log : function(message){
        gs.log("ngRecord " + message)
    },

    type : "ngGlideRecord"
 
});